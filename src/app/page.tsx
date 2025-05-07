import Image from "next/image";

export default async function Home() {
  return (
    <main className="h-screen w-full border p-10">
      <div className="flex w-full items-center justify-around gap-2 border">
        <div>
          <Image
            src="/assets/Logo.png"
            alt="gopay"
            width={100}
            height={100}
            className="object-contain"
          />
          <div className="text-4xl font-bold text-[#00D743]">GHOPay</div>
        </div>

        <div className="bg-[#E8FFB0] text-[#21701C]">points</div>
      </div>
    </main>
  );
}
