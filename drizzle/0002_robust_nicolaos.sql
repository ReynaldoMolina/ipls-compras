CREATE TABLE "cursos_carreras_areas" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cursos_carreras_areas_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" text,
	"tipo" text
);
--> statement-breakpoint
CREATE TABLE "solicitudes_detalle" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "solicitudes_detalle_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"producto_servicio" text,
	"cantidad" real,
	"unidad_medida" integer NOT NULL,
	"precio" real,
	"observaciones" text,
	"prioridad" text,
	"estado" text,
	"comprado" real,
	"recibido" real,
	"precio_compra" real,
	"entrega_bodega" real,
	"precio_bodega" real,
	"ubicado_en" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "solicitudes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "solicitudes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"fecha" date,
	"id_curso_carrera_area" integer NOT NULL,
	"id_usuario" integer NOT NULL,
	"revisado_bodega" boolean
);
--> statement-breakpoint
CREATE TABLE "ubicaciones" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "ubicaciones_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"ubicacion" text
);
--> statement-breakpoint
CREATE TABLE "unidades_medida" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "unidades_medida_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"unidad" text
);
--> statement-breakpoint
ALTER TABLE "solvencias" ALTER COLUMN "emitida" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "solvencias" ALTER COLUMN "vence" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "solvencias" ALTER COLUMN "verificado" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "solicitudes_detalle" ADD CONSTRAINT "solicitudes_detalle_unidad_medida_unidades_medida_id_fk" FOREIGN KEY ("unidad_medida") REFERENCES "public"."unidades_medida"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "solicitudes_detalle" ADD CONSTRAINT "solicitudes_detalle_ubicado_en_ubicaciones_id_fk" FOREIGN KEY ("ubicado_en") REFERENCES "public"."ubicaciones"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "solicitudes" ADD CONSTRAINT "solicitudes_id_curso_carrera_area_cursos_carreras_areas_id_fk" FOREIGN KEY ("id_curso_carrera_area") REFERENCES "public"."cursos_carreras_areas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "solicitudes" ADD CONSTRAINT "solicitudes_id_usuario_usuarios_id_fk" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuarios"("id") ON DELETE no action ON UPDATE no action;