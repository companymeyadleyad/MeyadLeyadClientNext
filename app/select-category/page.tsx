import ProtectedClientRoute from "@/components/Auth/ProtectedClientRoute";
import CategorySelectionPage from "@/components/CategorySelection/CategorySelectionPage";

export default function SelectCategoryPage() {
  return (
    <ProtectedClientRoute>
      <CategorySelectionPage />
    </ProtectedClientRoute>
  );
}
