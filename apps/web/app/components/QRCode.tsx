import qrcode from "~/lib/qrcode";

export function QRCode({
  data,
  className,
}: {
  data: string;
  className?: string;
}) {
  const typeNumber = 4;
  const errorCorrectionLevel = "L";
  const qr = qrcode(typeNumber, errorCorrectionLevel);

  qr.addData(data);
  qr.make();
  const qrSvg = qr
    .createSvgTag()
    .replaceAll(`fill="white"`, `fill="transparent"`);

  return (
    <img
      src={`data:image/svg+xml;utf8,${encodeURIComponent(qrSvg)}`}
      className={className}
    />
  );
}
