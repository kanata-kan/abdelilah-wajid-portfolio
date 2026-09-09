// Preserve every source character while isolating embedded Latin words in RTL.
export function BidiText({ children }: { children: string }) {
  return children.split(/([A-Za-z][A-Za-z0-9]*(?:[ .&·—-]+[A-Za-z][A-Za-z0-9]*)*)/g).map((part, index) =>
    index % 2 ? <bdi key={index} dir="ltr" className="latin">{part}</bdi> : part,
  );
}
