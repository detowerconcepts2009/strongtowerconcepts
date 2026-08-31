"use client";

import { useEffect, useState } from "react";

interface CatalogueImage {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
  createdAt: string;
}

interface CatalogueProduct {
  id: string;
  productType: "MATTRESS" | "PILLOW";
  name: string;
  description: string | null;
  active: boolean;
  createdAt: string;
  images: CatalogueImage[];
}

interface CatalogueResponse {
  success: boolean;
  products?: CatalogueProduct[];
  message?: string;
}

interface CreateProductResponse {
  success: boolean;
  product?: CatalogueProduct;
  message?: string;
}

interface UpdateProductResponse {
  success: boolean;
  product?: CatalogueProduct;
  message?: string;
}

interface UploadResponse {
  success: boolean;
  image?: CatalogueImage;
  message?: string;
}

const emptyEditForm = {
  name: "",
  description: "",
};

export default function CatalogueManager() {
  const [products, setProducts] = useState<
    CatalogueProduct[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  const [uploadingImage, setUploadingImage] =
    useState<string | null>(null);

  const [deletingImage, setDeletingImage] =
    useState<string | null>(null);

  const [deletingProduct, setDeletingProduct] =
    useState<string | null>(null);

  const [changingStatus, setChangingStatus] =
    useState<string | null>(null);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  /*
   * CREATE FORM
   */

  const [productType, setProductType] =
    useState<"MATTRESS" | "PILLOW">(
      "MATTRESS"
    );

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  /*
   * EDIT FORM
   */

  const [editingProductId, setEditingProductId] =
    useState<string | null>(null);

  const [editForm, setEditForm] =
    useState(emptyEditForm);

  /*
   * LOAD PRODUCTS
   */

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/catalogue/products",
        {
          cache: "no-store",
        }
      );

      const data: CatalogueResponse =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to load catalogue products."
        );
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error(
        "Catalogue loading error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to load catalogue products."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  /*
   * CREATE PRODUCT
   */

  async function handleCreateProduct(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError(
        "Product name is required."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const createResponse = await fetch(
        "/api/catalogue/products",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            productType,
            name: trimmedName,
            description:
              description.trim() || null,
          }),
        }
      );

      const createData: CreateProductResponse =
        await createResponse.json();

      if (
        !createResponse.ok ||
        !createData.success ||
        !createData.product
      ) {
        throw new Error(
          createData.message ||
            "Unable to create catalogue product."
        );
      }

      const createdProduct =
        createData.product;

      /*
       * Upload the selected image as the primary image.
       */

      if (selectedFile) {
        const formData =
          new FormData();

        formData.append(
          "productId",
          createdProduct.id
        );

        formData.append(
          "file",
          selectedFile
        );

        formData.append(
          "isPrimary",
          "true"
        );

        const uploadResponse =
          await fetch(
            "/api/catalogue/images",
            {
              method: "POST",
              body: formData,
            }
          );

        const uploadData: UploadResponse =
          await uploadResponse.json();

        if (
          !uploadResponse.ok ||
          !uploadData.success
        ) {
          setMessage(
            "Product was created, but its image could not be uploaded."
          );

          setError(
            uploadData.message ||
              "Unable to upload product image."
          );

          await loadProducts();
          return;
        }
      }

      setMessage(
        selectedFile
          ? "Product and primary image created successfully."
          : "Catalogue product created successfully."
      );

      setName("");
      setDescription("");
      setSelectedFile(null);

      const fileInput =
        document.getElementById(
          "catalogue-image"
        ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }

      await loadProducts();
    } catch (error) {
      console.error(
        "Catalogue creation error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to create catalogue product."
      );
    } finally {
      setSaving(false);
    }
  }

  /*
   * EDIT PRODUCT
   */

  function startEditing(
    product: CatalogueProduct
  ) {
    setEditingProductId(product.id);

    setEditForm({
      name: product.name,
      description:
        product.description || "",
    });

    setError("");
    setMessage("");
  }

  function cancelEditing() {
    setEditingProductId(null);
    setEditForm(emptyEditForm);
  }

  async function saveEdit(
    productId: string
  ) {
    if (!editForm.name.trim()) {
      setError(
        "Product name cannot be empty."
      );
      return;
    }

    try {
      setEditing(true);
      setError("");
      setMessage("");

      const response = await fetch(
        "/api/catalogue/products",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            productId,
            name: editForm.name.trim(),
            description:
              editForm.description.trim() ||
              null,
          }),
        }
      );

      const data: UpdateProductResponse =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to update product."
        );
      }

      setMessage(
        "Catalogue product updated successfully."
      );

      cancelEditing();

      await loadProducts();
    } catch (error) {
      console.error(
        "Product update error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to update product."
      );
    } finally {
      setEditing(false);
    }
  }

  /*
   * ACTIVATE / DEACTIVATE
   */

  async function toggleProductStatus(
    product: CatalogueProduct
  ) {
    try {
      setChangingStatus(product.id);
      setError("");
      setMessage("");

      const response = await fetch(
        "/api/catalogue/products",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            productId: product.id,
            active: !product.active,
          }),
        }
      );

      const data: UpdateProductResponse =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to change product status."
        );
      }

      setMessage(
        product.active
          ? "Product deactivated."
          : "Product activated."
      );

      await loadProducts();
    } catch (error) {
      console.error(
        "Product status error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to change product status."
      );
    } finally {
      setChangingStatus(null);
    }
  }

  /*
   * ADD IMAGE
   *
   * This uploads another image without making it primary.
   */

  async function addProductImage(
    productId: string,
    file: File
  ) {
    try {
      setUploadingImage(productId);
      setError("");
      setMessage("");

      const formData =
        new FormData();

      formData.append(
        "productId",
        productId
      );

      formData.append(
        "file",
        file
      );

      formData.append(
        "isPrimary",
        "false"
      );

      const response = await fetch(
        "/api/catalogue/images",
        {
          method: "POST",
          body: formData,
        }
      );

      const data: UploadResponse =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to add product image."
        );
      }

      setMessage(
        "Additional product image uploaded successfully."
      );

      await loadProducts();
    } catch (error) {
      console.error(
        "Additional image upload error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to add product image."
      );
    } finally {
      setUploadingImage(null);
    }
  }

  /*
   * REPLACE PRIMARY IMAGE
   */

  async function replacePrimaryImage(
    productId: string,
    file: File
  ) {
    try {
      setUploadingImage(productId);
      setError("");
      setMessage("");

      const formData =
        new FormData();

      formData.append(
        "productId",
        productId
      );

      formData.append(
        "file",
        file
      );

      formData.append(
        "isPrimary",
        "true"
      );

      const response = await fetch(
        "/api/catalogue/images",
        {
          method: "POST",
          body: formData,
        }
      );

      const data: UploadResponse =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to replace primary image."
        );
      }

      setMessage(
        "Primary image replaced successfully."
      );

      await loadProducts();
    } catch (error) {
      console.error(
        "Primary image replacement error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to replace primary image."
      );
    } finally {
      setUploadingImage(null);
    }
  }

  /*
   * SET PRIMARY IMAGE
   */

  async function setPrimaryImage(
    imageId: string
  ) {
    try {
      setError("");
      setMessage("");

      const response = await fetch(
        "/api/catalogue/images",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            imageId,
          }),
        }
      );

      const data: UploadResponse =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to set primary image."
        );
      }

      setMessage(
        "Primary image updated successfully."
      );

      await loadProducts();
    } catch (error) {
      console.error(
        "Set primary image error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to set primary image."
      );
    }
  }

  /*
   * DELETE IMAGE
   */

  async function deleteImage(
    imageId: string
  ) {
    const confirmed =
      window.confirm(
        "Delete this catalogue image?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingImage(imageId);
      setError("");
      setMessage("");

      const response = await fetch(
        `/api/catalogue/images?imageId=${encodeURIComponent(
          imageId
        )}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to delete image."
        );
      }

      setMessage(
        "Catalogue image deleted successfully."
      );

      await loadProducts();
    } catch (error) {
      console.error(
        "Image deletion error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete image."
      );
    } finally {
      setDeletingImage(null);
    }
  }

  /*
   * DELETE PRODUCT
   */

  async function deleteProduct(
    product: CatalogueProduct
  ) {
    const confirmed =
      window.confirm(
        `Delete "${product.name}" and all of its images? This cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingProduct(product.id);
      setError("");
      setMessage("");

      const response = await fetch(
        `/api/catalogue/products?productId=${encodeURIComponent(
          product.id
        )}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to delete product."
        );
      }

      if (
        editingProductId ===
        product.id
      ) {
        cancelEditing();
      }

      setMessage(
        "Catalogue product deleted successfully."
      );

      await loadProducts();
    } catch (error) {
      console.error(
        "Product deletion error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete product."
      );
    } finally {
      setDeletingProduct(null);
    }
  }

  return (
    <div className="space-y-8">
      {/* PAGE HEADER */}

      <div>
        <h1 className="text-3xl font-black text-blue-950">
          Catalogue Management
        </h1>

        <p className="mt-2 text-slate-600">
          Manage mattresses and pillows, their images
          and catalogue status.
        </p>
      </div>

      {/* MESSAGES */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {message && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          {message}
        </div>
      )}

      {/* CREATE PRODUCT */}

      <form
        onSubmit={handleCreateProduct}
        className="rounded-2xl bg-white p-6 shadow-lg"
      >
        <h2 className="text-xl font-bold text-blue-950">
          Add Catalogue Product
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Create a mattress or pillow and upload its
          primary image in one step.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {/* PRODUCT TYPE */}

          <div>
            <label
              htmlFor="product-type"
              className="block text-sm font-semibold text-slate-700"
            >
              Product Type
            </label>

            <select
              id="product-type"
              value={productType}
              onChange={(event) =>
                setProductType(
                  event.target.value as
                    | "MATTRESS"
                    | "PILLOW"
                )
              }
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            >
              <option value="MATTRESS">
                Mattress
              </option>

              <option value="PILLOW">
                Pillow
              </option>
            </select>
          </div>

          {/* PRODUCT NAME */}

          <div>
            <label
              htmlFor="product-name"
              className="block text-sm font-semibold text-slate-700"
            >
              Product Name
            </label>

            <input
              id="product-name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
              placeholder="e.g. Vita Supreme"
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* DESCRIPTION */}

        <div className="mt-5">
          <label
            htmlFor="product-description"
            className="block text-sm font-semibold text-slate-700"
          >
            Description
          </label>

          <textarea
            id="product-description"
            value={description}
            onChange={(event) =>
              setDescription(
                event.target.value
              )
            }
            rows={4}
            placeholder="Optional product description"
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* PRIMARY IMAGE */}

        <div className="mt-5">
          <label
            htmlFor="catalogue-image"
            className="block text-sm font-semibold text-slate-700"
          >
            Primary Product Image
          </label>

          <input
            id="catalogue-image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) =>
              setSelectedFile(
                event.target.files?.[0] ||
                  null
              )
            }
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3"
          />

          <p className="mt-2 text-xs text-slate-500">
            JPG, PNG or WebP. Maximum 5MB.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-6 rounded-xl bg-blue-900 px-7 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? selectedFile
              ? "Creating & Uploading..."
              : "Creating..."
            : "Create Product"}
        </button>
      </form>

      {/* EXISTING CATALOGUE */}

      <section className="rounded-2xl bg-white p-6 shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-blue-950">
            Catalogue Products
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage existing mattresses and pillows.
          </p>
        </div>

        {loading ? (
          <p className="mt-6 text-slate-500">
            Loading catalogue...
          </p>
        ) : products.length === 0 ? (
          <div className="mt-6 rounded-xl bg-slate-50 p-5 text-sm text-slate-500">
            No catalogue products yet.
          </div>
        ) : (
          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            {products.map((product) => {
              const primaryImage =
                product.images.find(
                  (image) =>
                    image.isPrimary
                ) ||
                product.images[0];

              const isEditing =
                editingProductId ===
                product.id;

              return (
                <article
                  key={product.id}
                  className="overflow-hidden rounded-2xl border border-slate-200"
                >
                  {/* PRIMARY IMAGE */}

                  <div className="relative flex h-64 items-center justify-center bg-slate-100">
                    {primaryImage ? (
                      <img
                        src={
                          primaryImage.imageUrl
                        }
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-sm text-slate-400">
                        No image uploaded
                      </span>
                    )}

                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase text-blue-800 shadow">
                        {product.productType}
                      </span>
                    </div>

                    <div className="absolute right-4 top-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold shadow ${
                          product.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.active
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    {!isEditing ? (
                      <>
                        <h3 className="text-xl font-bold text-blue-950">
                          {product.name}
                        </h3>

                        {product.description && (
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {
                              product.description
                            }
                          </p>
                        )}

                        <p className="mt-3 text-xs text-slate-500">
                          {product.images.length}{" "}
                          image
                          {product.images.length ===
                          1
                            ? ""
                            : "s"}
                        </p>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor={`edit-name-${product.id}`}
                            className="block text-sm font-semibold text-slate-700"
                          >
                            Product Name
                          </label>

                          <input
                            id={`edit-name-${product.id}`}
                            value={
                              editForm.name
                            }
                            onChange={(
                              event
                            ) =>
                              setEditForm(
                                (current) => ({
                                  ...current,
                                  name:
                                    event.target
                                      .value,
                                })
                              )
                            }
                            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`edit-description-${product.id}`}
                            className="block text-sm font-semibold text-slate-700"
                          >
                            Description
                          </label>

                          <textarea
                            id={`edit-description-${product.id}`}
                            value={
                              editForm.description
                            }
                            onChange={(
                              event
                            ) =>
                              setEditForm(
                                (current) => ({
                                  ...current,
                                  description:
                                    event.target
                                      .value,
                                })
                              )
                            }
                            rows={3}
                            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
                          />
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              saveEdit(
                                product.id
                              )
                            }
                            disabled={
                              editing
                            }
                            className="rounded-xl bg-blue-900 px-5 py-2.5 font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
                          >
                            {editing
                              ? "Saving..."
                              : "Save Changes"}
                          </button>

                          <button
                            type="button"
                            onClick={
                              cancelEditing
                            }
                            className="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {!isEditing && (
                      <>
                        {/* PRODUCT ACTIONS */}

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          <button
                            type="button"
                            onClick={() =>
                              startEditing(
                                product
                              )
                            }
                            className="rounded-xl border border-blue-900 px-4 py-2.5 font-semibold text-blue-900 hover:bg-blue-50"
                          >
                            Edit Details
                          </button>

                          {/* REPLACE PRIMARY */}

                          <label
                            className={`cursor-pointer rounded-xl bg-blue-900 px-4 py-2.5 text-center font-semibold text-white hover:bg-blue-800 ${
                              uploadingImage ===
                              product.id
                                ? "pointer-events-none opacity-60"
                                : ""
                            }`}
                          >
                            {uploadingImage ===
                            product.id
                              ? "Uploading..."
                              : "Replace Primary Image"}

                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              className="hidden"
                              disabled={
                                uploadingImage ===
                                product.id
                              }
                              onChange={async (
                                event
                              ) => {
                                const file =
                                  event.target
                                    .files?.[0];

                                if (file) {
                                  await replacePrimaryImage(
                                    product.id,
                                    file
                                  );
                                }

                                event.target.value =
                                  "";
                              }}
                            />
                          </label>

                          {/* ADD IMAGE */}

                          <label
                            className={`cursor-pointer rounded-xl border border-blue-900 px-4 py-2.5 text-center font-semibold text-blue-900 hover:bg-blue-50 ${
                              uploadingImage ===
                              product.id
                                ? "pointer-events-none opacity-60"
                                : ""
                            }`}
                          >
                            {uploadingImage ===
                            product.id
                              ? "Uploading..."
                              : "Add Another Image"}

                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              className="hidden"
                              disabled={
                                uploadingImage ===
                                product.id
                              }
                              onChange={async (
                                event
                              ) => {
                                const file =
                                  event.target
                                    .files?.[0];

                                if (file) {
                                  await addProductImage(
                                    product.id,
                                    file
                                  );
                                }

                                event.target.value =
                                  "";
                              }}
                            />
                          </label>

                          {/* STATUS */}

                          <button
                            type="button"
                            onClick={() =>
                              toggleProductStatus(
                                product
                              )
                            }
                            disabled={
                              changingStatus ===
                              product.id
                            }
                            className="rounded-xl border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                          >
                            {changingStatus ===
                            product.id
                              ? "Updating..."
                              : product.active
                                ? "Deactivate"
                                : "Activate"}
                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            onClick={() =>
                              deleteProduct(
                                product
                              )
                            }
                            disabled={
                              deletingProduct ===
                              product.id
                            }
                            className="rounded-xl border border-red-200 px-4 py-2.5 font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50 sm:col-span-2"
                          >
                            {deletingProduct ===
                            product.id
                              ? "Deleting..."
                              : "Delete Product"}
                          </button>
                        </div>

                        {/* IMAGE MANAGEMENT */}

                        <div className="mt-6 border-t border-slate-200 pt-5">
                          <div className="flex items-center justify-between gap-4">
                            <h4 className="font-bold text-blue-950">
                              Product Images
                            </h4>

                            <span className="text-xs text-slate-500">
                              {product.images.length}{" "}
                              image
                              {product.images.length ===
                              1
                                ? ""
                                : "s"}
                            </span>
                          </div>

                          {product.images.length ===
                          0 ? (
                            <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                              No images uploaded yet.
                            </p>
                          ) : (
                            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
                              {product.images.map(
                                (image) => (
                                  <div
                                    key={
                                      image.id
                                    }
                                    className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                                  >
                                    <div className="relative aspect-square bg-slate-100">
                                      <img
                                        src={
                                          image.imageUrl
                                        }
                                        alt={
                                          product.name
                                        }
                                        className="h-full w-full object-cover"
                                      />

                                      {image.isPrimary && (
                                        <span className="absolute left-2 top-2 rounded-full bg-blue-900 px-2 py-1 text-[10px] font-bold text-white">
                                          PRIMARY
                                        </span>
                                      )}
                                    </div>

                                    <div className="space-y-2 p-2">
                                      {!image.isPrimary && (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            setPrimaryImage(
                                              image.id
                                            )
                                          }
                                          className="w-full rounded-lg bg-blue-50 px-2 py-2 text-xs font-semibold text-blue-900 hover:bg-blue-100"
                                        >
                                          Make Primary
                                        </button>
                                      )}

                                      <button
                                        type="button"
                                        onClick={() =>
                                          deleteImage(
                                            image.id
                                          )
                                        }
                                        disabled={
                                          deletingImage ===
                                          image.id
                                        }
                                        className="w-full rounded-lg bg-red-50 px-2 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50"
                                      >
                                        {deletingImage ===
                                        image.id
                                          ? "Deleting..."
                                          : "Delete Image"}
                                      </button>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}