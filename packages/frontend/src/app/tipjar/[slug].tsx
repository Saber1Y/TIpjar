// app/tipjar/[slug]/page.tsx
import TipJarPage from "@/components/tip-jar";
import TipjarFactory from "@/artifacts/TipjarFactory.json";
import Tipjar from "@/artifacts/Tipjar.json";
import ContractInfo from "@/artifacts/contract.json";

export default function TipJarRoute({ params }: { params: { slug: string } }) {
    const abi = TipjarFactory.abi;
    const tipabi = Tipjar.abi;
    const ContractAddress = ContractInfo.address;

    return (
        <TipJarPage
            FactoryAbi={abi}
            FactoryAddress={ContractAddress as `0x${string}`}
            TipJarAbi={tipabi}
        />
    );
}
