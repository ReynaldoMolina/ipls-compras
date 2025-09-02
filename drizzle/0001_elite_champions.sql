CREATE TABLE "usuarios" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "usuarios_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" text NOT NULL,
	"apellido" text NOT NULL,
	"correo" text NOT NULL,
	"password" text NOT NULL,
	"rol" text NOT NULL,
	"activo" boolean NOT NULL
);
--> statement-breakpoint
-- ALTER TABLE "solvencias" ADD COLUMN "id_usuario" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "solvencias" ADD CONSTRAINT "solvencias_id_usuario_usuarios_id_fk" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuarios"("id") ON DELETE no action ON UPDATE no action;