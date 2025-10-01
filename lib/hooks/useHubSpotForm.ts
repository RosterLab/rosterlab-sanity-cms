import { useEffect, useCallback, useRef } from "react";

interface HubSpotFormConfig {
  portalId: string;
  formId: string;
  region?: string;
  target: string;
  onFormSubmitted?: (formData: any) => void | Promise<void>;
  onFormReady?: () => void;
  onFormError?: (error: any) => void;
}

interface UseHubSpotFormOptions {
  config: HubSpotFormConfig;
  shouldLoad: boolean;
  cleanupOnUnmount?: boolean;
}

export function useHubSpotForm({
  config,
  shouldLoad,
  cleanupOnUnmount = true,
}: UseHubSpotFormOptions) {
  const hasCreatedFormRef = useRef(false);
  const scriptLoadedRef = useRef(false);

  const createForm = useCallback(() => {
    if (!window.hbspt?.forms || hasCreatedFormRef.current) {
      return;
    }

    hasCreatedFormRef.current = true;

    try {
      const formConfig: any = {
        portalId: config.portalId,
        formId: config.formId,
        region: config.region || "na1",
        target: config.target,
        onFormSubmitted: async (formData: any) => {
          try {
            if (config.onFormSubmitted) {
              await config.onFormSubmitted(formData);
            }
          } catch (error) {
            console.error("Error in form submission handler:", error);
            config.onFormError?.(error);
          }
        },
      };

      if (config.onFormReady) {
        formConfig.onFormReady = () => {
          config.onFormReady?.();
        };
      }

      window.hbspt.forms.create(formConfig);
    } catch (error) {
      console.error("Error creating HubSpot form:", error);
      config.onFormError?.(error);
      hasCreatedFormRef.current = false;
    }
  }, [config]);

  const loadHubSpotScript = useCallback(() => {
    if (scriptLoadedRef.current) {
      createForm();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/embed/v2.js";
    script.charset = "utf-8";
    script.type = "text/javascript";
    script.async = true;

    script.onload = () => {
      scriptLoadedRef.current = true;
      createForm();
    };

    script.onerror = (error) => {
      console.error("Failed to load HubSpot script:", error);
      config.onFormError?.(error);
    };

    document.body.appendChild(script);
  }, [createForm, config]);

  const cleanupForm = useCallback(() => {
    const formContainer = document.getElementById(
      config.target.replace("#", ""),
    );
    if (formContainer) {
      formContainer.innerHTML = "";
      formContainer.style.display = "block";
    }
    hasCreatedFormRef.current = false;
  }, [config.target]);

  useEffect(() => {
    if (!shouldLoad) {
      return;
    }

    const timer = setTimeout(() => {
      if (window.hbspt?.forms) {
        createForm();
      } else {
        loadHubSpotScript();
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (cleanupOnUnmount) {
        cleanupForm();
      }
    };
  }, [
    shouldLoad,
    createForm,
    loadHubSpotScript,
    cleanupForm,
    cleanupOnUnmount,
  ]);

  const resetForm = useCallback(() => {
    cleanupForm();
    hasCreatedFormRef.current = false;
    if (shouldLoad) {
      createForm();
    }
  }, [cleanupForm, createForm, shouldLoad]);

  return {
    resetForm,
    isFormCreated: hasCreatedFormRef.current,
    isScriptLoaded: scriptLoadedRef.current,
  };
}
