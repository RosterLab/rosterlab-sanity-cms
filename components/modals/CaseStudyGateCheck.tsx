"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CTAModalCaseStudy from "./CTAModalCaseStudy";

interface CaseStudyGateCheckProps {
  slug: string;
  lockedSlugs?: string[];
  children: React.ReactNode;
}

/**
 * Component that checks if a case study should be gated
 * Shows modal if user hasn't filled out the form
 * Hides content until form is submitted
 */
export default function CaseStudyGateCheck({
  slug,
  lockedSlugs = ["how-plastics-department-used-roster-simulation-to-cut-in-costs"],
  children,
}: CaseStudyGateCheckProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if this case study is locked
  const isLocked = lockedSlugs.includes(slug);

  useEffect(() => {
    if (!isLocked) {
      // If not locked, grant access immediately
      setHasAccess(true);
      setIsLoading(false);
      return;
    }

    // Check if user has previously unlocked case studies
    const hasUnlocked = localStorage.getItem("case_study_unlocked");
    if (hasUnlocked === "true") {
      setHasAccess(true);
      setIsLoading(false);
      return;
    }

    // User needs to fill out form
    setHasAccess(false);
    setIsLoading(false);
    // Show modal after a brief delay for better UX
    setTimeout(() => {
      setIsModalOpen(true);
    }, 500);
  }, [slug, isLocked]);

  const handleConversion = () => {
    // Mark as unlocked
    localStorage.setItem("case_study_unlocked", "true");
    setHasAccess(true);
    setIsModalOpen(false);
  };

  const handleClose = () => {
    // Redirect back to case studies page if they close without submitting
    router.push("/case-studies");
  };

  // Show loading state briefly
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Show blurred content if locked and no access */}
      {isLocked && !hasAccess ? (
        <div className="relative">
          <div className="blur-sm pointer-events-none select-none">{children}</div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
        </div>
      ) : (
        children
      )}

      {/* Case Study Gate Modal */}
      {isLocked && (
        <CTAModalCaseStudy
          isOpen={isModalOpen}
          onClose={handleClose}
          onConversion={handleConversion}
          caseStudySlug={slug}
          isContentGate={true}
        />
      )}
    </>
  );
}
