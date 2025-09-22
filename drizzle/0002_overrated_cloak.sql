CREATE TABLE "ordenes_detalle" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "ordenes_detalle_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"id_orden" integer NOT NULL,
	"id_solicitud_detalle" integer NOT NULL,
	"cantidad" real NOT NULL,
	"precio_real" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ordenes_estados" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "ordenes_estados_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"estado" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ordenes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "ordenes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"id_solicitud" integer NOT NULL,
	"fecha" date NOT NULL,
	"id_estado" integer,
	"observaciones" text
);
--> statement-breakpoint
ALTER TABLE "ordenes_detalle" ADD CONSTRAINT "ordenes_detalle_id_orden_ordenes_id_fk" FOREIGN KEY ("id_orden") REFERENCES "public"."ordenes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ordenes_detalle" ADD CONSTRAINT "ordenes_detalle_id_solicitud_detalle_solicitudes_detalle_id_fk" FOREIGN KEY ("id_solicitud_detalle") REFERENCES "public"."solicitudes_detalle"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ordenes" ADD CONSTRAINT "ordenes_id_solicitud_solicitudes_id_fk" FOREIGN KEY ("id_solicitud") REFERENCES "public"."solicitudes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ordenes" ADD CONSTRAINT "ordenes_id_estado_ordenes_estados_id_fk" FOREIGN KEY ("id_estado") REFERENCES "public"."ordenes_estados"("id") ON DELETE no action ON UPDATE no action;