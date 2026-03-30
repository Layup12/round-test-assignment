import { Capacitor } from '@capacitor/core';

export function isCapacitorNativeRuntime(): boolean {
  return Capacitor.isNativePlatform();
}

export function getCapacitorPlatform(): string {
  return Capacitor.getPlatform();
}
