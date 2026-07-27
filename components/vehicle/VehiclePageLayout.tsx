import VehicleHero from "./VehicleHero";
import VehicleSearchBar from "./VehicleSearchBar";
import VehicleFilters from "./VehicleFilters";
import VehicleGrid from "./VehicleGrid";

export default function VehiclePageLayout() {

  return (

    <main className="mx-auto max-w-7xl space-y-10 px-6 py-12">

      <VehicleHero />

      <VehicleSearchBar />

      <div className="grid gap-10 lg:grid-cols-4">

        <div>

          <VehicleFilters />

        </div>

        <div className="lg:col-span-3">

          <VehicleGrid />

        </div>

      </div>

    </main>

  );

}