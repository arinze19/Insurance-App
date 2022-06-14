-- CreateTable
CREATE TABLE "Family" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "policyId" UUID NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
