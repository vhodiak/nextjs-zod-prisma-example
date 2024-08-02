-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "teamId" VARCHAR(32) NOT NULL,
    "clientId" VARCHAR(32) NOT NULL,
    "title" VARCHAR(60) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IDX_pteamid" ON "Project"("teamId");

-- CreateIndex
CREATE INDEX "IDX_pclientid" ON "Project"("clientId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
