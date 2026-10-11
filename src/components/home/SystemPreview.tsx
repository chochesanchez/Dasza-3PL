// Static illustration of the client portal, mirroring the real Dasza System reports.
const ROWS = [
  { item: 'ALU-01042', desc: 'Aluminum wheel hub casting', qty: '3,584', plt: 14, loc: 'C08-3' },
  { item: 'ALU-01079', desc: 'Steel brake drum', qty: '1,764', plt: 9, loc: 'A05-1' },
  { item: 'CMP-02210', desc: 'Hermetic compressor motor', qty: '6,512', plt: 37, loc: 'D09-5' },
  { item: 'CMP-02247', desc: 'Run capacitor 45µF', qty: '1,407', plt: 7, loc: 'B09-5' },
]

export default function SystemPreview() {
  return (
    <div aria-hidden className="rounded-lg overflow-hidden border border-white/10 bg-white text-dasza-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between bg-dasza-charcoal text-white px-4 py-2.5 text-sm">
        <span className="font-semibold">DASZA System</span>
        <span className="text-white/60">Inventory</span>
      </div>
      <div className="grid grid-cols-3 border-b border-dasza-line text-center">
        {[
          ['Pallets on hand', '412'],
          ['Receipts (30 days)', '18'],
          ['Accuracy', '99.6%'],
        ].map(([k, v]) => (
          <div key={k} className="py-3 border-r last:border-r-0 border-dasza-line">
            <div className="font-display text-xl font-semibold tabular-nums">{v}</div>
            <div className="text-[11px] text-dasza-navy">{k}</div>
          </div>
        ))}
      </div>
      <table className="w-full text-[12px]">
        <thead className="bg-dasza-paper text-dasza-navy">
          <tr>
            <th className="text-left font-medium px-3 py-2">Item</th>
            <th className="text-left font-medium px-3 py-2 hidden sm:table-cell">Description</th>
            <th className="text-right font-medium px-3 py-2">Qty</th>
            <th className="text-right font-medium px-3 py-2">Pallets</th>
            <th className="text-left font-medium px-3 py-2">Location</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.item} className="border-t border-dasza-line">
              <td className="px-3 py-2 font-medium">{r.item}</td>
              <td className="px-3 py-2 hidden sm:table-cell text-dasza-navy">{r.desc}</td>
              <td className="px-3 py-2 text-right tabular-nums">{r.qty}</td>
              <td className="px-3 py-2 text-right tabular-nums">{r.plt}</td>
              <td className="px-3 py-2">{r.loc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
