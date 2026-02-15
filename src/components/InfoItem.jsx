const InfoItem = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-sm text-[#94a3b8]">{label}</p>
    <p className="text-lg font-semibold text-[#e5e7eb]">{value || "N/A"}</p>
  </div>
);

export default InfoItem;
