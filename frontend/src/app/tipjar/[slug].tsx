// app/tipjar/[slug]/page.tsx
import TipJarPage from "../../../components/TipJarPage";
import TipjarFactory from "../../../Data/TipjarFactory.json";
import Tipjar from "../../../Data/Tipjar.json";

export default function TipJarRoute({ params }: { params: { slug: string } }) {
  const abi = TipjarFactory.abi;
  const tipabi = Tipjar.abi;
  const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  
  return (
    <TipJarPage
      FactoryAbi={abi}
      FactoryAddress={ContractAddress as `0x${string}`}
      TipJarAbi={tipabi}
    />
  );
}