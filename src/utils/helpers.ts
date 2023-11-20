export function serializeIntoQuery(data: any) {
  if (!data || Object.entries(data).length == 0) return "";

  const query = [];
  for (let p in data) {
    if (data.hasOwnProperty(p)) {
      query.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
    }
  }

  return "?" + query.join("&");
}

export function addAuditLogReason(reason?: string): any {
  if (!reason) return {};

  return {
    "X-Audit-Log-Reason": reason,
  };
}
