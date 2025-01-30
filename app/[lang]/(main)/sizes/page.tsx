import Image from 'next/image';

export default function Page() {
  return (
    <div className="w-full pt-20">
      <Image
        src="/work-in-progress.svg"
        alt="wip"
        width={400}
        height={400}
        className="mx-auto"
      />
    </div>
  );
}
