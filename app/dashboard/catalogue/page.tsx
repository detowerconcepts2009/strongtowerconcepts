import { requireRole } from "@/lib/auth";
import CatalogueManager from "@/components/dashboard/CatalogueManager";

export default async function CataloguePage() {
  await requireRole([
    "SUPER_ADMIN",
    "ADMIN",
    "STAFF",
  ]);

  return <CatalogueManager />;
}