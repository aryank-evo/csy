const LEAD_CAPTURE_STORAGE_KEY = "lead_capture_submission";
const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000;

interface LeadCaptureRecord {
  submittedAt: number;
}

const getSafeStorage = (): Storage | null => {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage;
};

const readLeadCaptureRecord = (): LeadCaptureRecord | null => {
  const storage = getSafeStorage();
  if (!storage) {
    return null;
  }

  const raw = storage.getItem(LEAD_CAPTURE_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as LeadCaptureRecord;
    if (!parsed || typeof parsed.submittedAt !== "number") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

export const hasRecentLeadSubmission = (): boolean => {
  const record = readLeadCaptureRecord();
  if (!record) {
    return false;
  }

  const age = Date.now() - record.submittedAt;
  return age >= 0 && age < THIRTY_DAYS_IN_MS;
};

export const markLeadSubmissionNow = (): void => {
  const storage = getSafeStorage();
  if (!storage) {
    return;
  }

  const record: LeadCaptureRecord = {
    submittedAt: Date.now(),
  };

  storage.setItem(LEAD_CAPTURE_STORAGE_KEY, JSON.stringify(record));
};

