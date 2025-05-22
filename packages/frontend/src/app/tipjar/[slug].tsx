// app/tipjar/[slug]/page.tsx
import TipJarPage from "@/components/tip-jar-page";
import TipjarFactory from "@/abi/TipjarFactory.json";
import Tipjar from "@/abi/Tipjar.json";
import ContractInfo from "@/contract.json";

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
