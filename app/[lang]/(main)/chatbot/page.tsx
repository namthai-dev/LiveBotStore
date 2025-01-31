import Image from 'next/image';

export default function Page() {
  return (
    <div className="pt-20">
      <Image
        src="/work-in-progress.svg"
        alt="wip"
        width={400}
        height={400}
        className="mx-auto dark:hidden"
      />
      <Image
        src="/work-in-progress-dark.svg"
        alt="wip"
        width={400}
        height={400}
        className="mx-auto hidden data-[a]:hidden dark:block"
      />
    </div>
  );
}
