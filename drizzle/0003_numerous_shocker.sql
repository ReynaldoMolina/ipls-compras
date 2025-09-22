ALTER TABLE "ordenes_detalle" ALTER COLUMN "precio_real" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "ordenes" ADD COLUMN "id_proveedor" integer;--> statement-breakpoint
ALTER TABLE "ordenes" ADD COLUMN "numero_cotizacion" text;--> statement-breakpoint
ALTER TABLE "ordenes" ADD COLUMN "termino_de_pago" text;--> statement-breakpoint
ALTER TABLE "ordenes" ADD COLUMN "moneda" text;--> statement-breakpoint
ALTER TABLE "ordenes" ADD CONSTRAINT "ordenes_id_proveedor_proveedores_id_fk" FOREIGN KEY ("id_proveedor") REFERENCES "public"."proveedores"("id") ON DELETE no action ON UPDATE no action;