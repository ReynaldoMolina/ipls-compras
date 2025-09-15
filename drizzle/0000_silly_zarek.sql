CREATE TABLE "categoria_productos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "categoria_productos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"categoria" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "departamentos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "departamentos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"departamento" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "entidades_academicas" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "entidades_academicas_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" text NOT NULL,
	"tipo" text NOT NULL,
	"abreviacion" text NOT NULL
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
CREATE TABLE "solicitudes_detalle" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "solicitudes_detalle_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"id_solicitud" integer NOT NULL,
	"producto_servicio" text NOT NULL,
	"cantidad" real NOT NULL,
	"id_unidad_medida" integer NOT NULL,
	"precio" real NOT NULL,
	"observaciones" text,
	"prioridad" text,
	"id_estado" integer,
	"comprado" real,
	"recibido" real,
	"precio_compra" real,
	"entrega_bodega" real,
	"precio_bodega" real,
	"id_ubicacion" integer,
	"id_categoria" integer
);
--> statement-breakpoint
CREATE TABLE "solicitudes_estados" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "solicitudes_estados_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"estado" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "solicitudes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "solicitudes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"fecha" date NOT NULL,
	"id_entidad_academica" integer NOT NULL,
	"id_usuario" integer NOT NULL,
	"revisado_bodega" boolean
);
--> statement-breakpoint
CREATE TABLE "solvencias" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "solvencias_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"id_proveedor" integer NOT NULL,
	"emitida" date,
	"vence" date,
	"verificado" date NOT NULL,
	"recibido" date,
	"url" text,
	"id_usuario" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subsectores" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "subsectores_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"subsector" text NOT NULL,
	"id_sector" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ubicaciones" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "ubicaciones_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"ubicacion" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "unidades_medida" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "unidades_medida_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"unidad_medida" text NOT NULL
);
--> statement-breakpoint
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
ALTER TABLE "proveedores" ADD CONSTRAINT "proveedores_id_departamento_departamentos_id_fk" FOREIGN KEY ("id_departamento") REFERENCES "public"."departamentos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proveedores" ADD CONSTRAINT "proveedores_id_sector_sectores_id_fk" FOREIGN KEY ("id_sector") REFERENCES "public"."sectores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proveedores" ADD CONSTRAINT "proveedores_id_subsector_subsectores_id_fk" FOREIGN KEY ("id_subsector") REFERENCES "public"."subsectores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "solicitudes_detalle" ADD CONSTRAINT "solicitudes_detalle_id_solicitud_solicitudes_id_fk" FOREIGN KEY ("id_solicitud") REFERENCES "public"."solicitudes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "solicitudes_detalle" ADD CONSTRAINT "solicitudes_detalle_id_unidad_medida_unidades_medida_id_fk" FOREIGN KEY ("id_unidad_medida") REFERENCES "public"."unidades_medida"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "solicitudes_detalle" ADD CONSTRAINT "solicitudes_detalle_id_estado_solicitudes_estados_id_fk" FOREIGN KEY ("id_estado") REFERENCES "public"."solicitudes_estados"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "solicitudes_detalle" ADD CONSTRAINT "solicitudes_detalle_id_ubicacion_ubicaciones_id_fk" FOREIGN KEY ("id_ubicacion") REFERENCES "public"."ubicaciones"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "solicitudes_detalle" ADD CONSTRAINT "solicitudes_detalle_id_categoria_categoria_productos_id_fk" FOREIGN KEY ("id_categoria") REFERENCES "public"."categoria_productos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "solicitudes" ADD CONSTRAINT "solicitudes_id_entidad_academica_entidades_academicas_id_fk" FOREIGN KEY ("id_entidad_academica") REFERENCES "public"."entidades_academicas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "solicitudes" ADD CONSTRAINT "solicitudes_id_usuario_usuarios_id_fk" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuarios"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "solvencias" ADD CONSTRAINT "solvencias_id_proveedor_proveedores_id_fk" FOREIGN KEY ("id_proveedor") REFERENCES "public"."proveedores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "solvencias" ADD CONSTRAINT "solvencias_id_usuario_usuarios_id_fk" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuarios"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subsectores" ADD CONSTRAINT "subsectores_id_sector_sectores_id_fk" FOREIGN KEY ("id_sector") REFERENCES "public"."sectores"("id") ON DELETE no action ON UPDATE no action;