-- DropForeignKey
ALTER TABLE "store"."ProductCreated" DROP CONSTRAINT "ProductCreated_productId_fkey";

-- AddForeignKey
ALTER TABLE "store"."ProductCreated" ADD CONSTRAINT "ProductCreated_productId_fkey" FOREIGN KEY ("productId") REFERENCES "store"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
