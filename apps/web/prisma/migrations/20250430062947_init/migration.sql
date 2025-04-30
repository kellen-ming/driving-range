-- CreateTable
CREATE TABLE "Color" (
    "id" SERIAL NOT NULL,
    "hexCode" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColorCombination" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ColorCombination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColorCombinationColor" (
    "id" SERIAL NOT NULL,
    "colorId" INTEGER NOT NULL,
    "colorCombinationId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ColorCombinationColor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Color_hexCode_key" ON "Color"("hexCode");

-- CreateIndex
CREATE INDEX "Color_hexCode_idx" ON "Color"("hexCode");

-- CreateIndex
CREATE INDEX "ColorCombination_type_idx" ON "ColorCombination"("type");

-- CreateIndex
CREATE UNIQUE INDEX "ColorCombinationColor_colorId_colorCombinationId_order_key" ON "ColorCombinationColor"("colorId", "colorCombinationId", "order");

-- AddForeignKey
ALTER TABLE "ColorCombinationColor" ADD CONSTRAINT "ColorCombinationColor_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColorCombinationColor" ADD CONSTRAINT "ColorCombinationColor_colorCombinationId_fkey" FOREIGN KEY ("colorCombinationId") REFERENCES "ColorCombination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
