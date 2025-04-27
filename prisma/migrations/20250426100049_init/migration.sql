-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "nomor" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bank" (
    "id" BIGSERIAL NOT NULL,
    "nama" TEXT,
    "nomor" DECIMAL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "nik" INTEGER,

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nomor_key" ON "User"("nomor");

-- AddForeignKey
ALTER TABLE "Bank" ADD CONSTRAINT "Bank_nik_fkey" FOREIGN KEY ("nik") REFERENCES "User"("nomor") ON DELETE CASCADE ON UPDATE CASCADE;
