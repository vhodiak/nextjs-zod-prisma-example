-- CreateIndex
CREATE INDEX "Client_firstName_lastName_email_tel_idx" ON "Client"("firstName", "lastName", "email", "tel");
