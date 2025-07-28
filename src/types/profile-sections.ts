// Medal data structure
export interface Medal {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  earnedDate: string;
  progress?: {
    current: number;
    total: number;
  };
}

// Qualification data structure
export interface Qualification {
  id: string;
  title: string;
  issuer: string;
  description: string;
  status: "active" | "expired" | "pending" | "verified";
  issuedDate: string;
  expiryDate?: string;
  credentialUrl?: string;
  tags: string[];
}

// Audit log entry structure
export interface AuditLogEntry {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  type: "info" | "warning" | "success" | "error";
  details?: Record<string, any>;
  performedBy?: {
    id: string;
    name: string;
    role: string;
  };
}

// Component props interfaces
export interface MedalsProps {
  medals: Medal[];
  className?: string;
}

export interface QualificationsProps {
  qualifications: Qualification[];
  className?: string;
}

export interface AuditLogsProps {
  auditLogs: AuditLogEntry[];
  className?: string;
}
