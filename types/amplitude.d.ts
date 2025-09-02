interface Window {
  amplitude?: {
    getDeviceId: () => string;
    setUserId: (userId: string) => void;
    setDeviceId: (deviceId: string) => void;
    identify: (identify: any) => void;
    Identify: new () => any;
  };
}
