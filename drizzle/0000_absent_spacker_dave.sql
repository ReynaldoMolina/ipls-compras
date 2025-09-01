CREATE TABLE "departamentos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "departamentos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"departamento" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "proveedores" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "proveedores_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre_comercial" text NOT NULL,
	"razon_social" text,
	"ruc" text,
	"contacto_principal" text,
	"telefono" text,
	"correo" text,
	"id_departamento" integer NOT NULL,
	"direccion" text,
	"id_sector" integer,
	"id_subsector" integer
);
--> statement-breakpoint
CREATE TABLE "sectores" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sectores_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"sector" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "solvencias" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "solvencias_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"id_proveedor" integer NOT NULL,
	"emitida" date NOT NULL,
	"vence" date NOT NULL,
	"verificado" date,
	"recibido" date,
	"url" text
);
--> statement-breakpoint
CREATE TABLE "subsectores" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "subsectores_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"subsector" text NOT NULL,
	"id_sector" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "proveedores" ADD CONSTRAINT "proveedores_id_departamento_departamentos_id_fk" FOREIGN KEY ("id_departamento") REFERENCES "public"."departamentos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proveedores" ADD CONSTRAINT "proveedores_id_sector_sectores_id_fk" FOREIGN KEY ("id_sector") REFERENCES "public"."sectores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proveedores" ADD CONSTRAINT "proveedores_id_subsector_subsectores_id_fk" FOREIGN KEY ("id_subsector") REFERENCES "public"."subsectores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "solvencias" ADD CONSTRAINT "solvencias_id_proveedor_proveedores_id_fk" FOREIGN KEY ("id_proveedor") REFERENCES "public"."proveedores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subsectores" ADD CONSTRAINT "subsectores_id_sector_sectores_id_fk" FOREIGN KEY ("id_sector") REFERENCES "public"."sectores"("id") ON DELETE no action ON UPDATE no action;