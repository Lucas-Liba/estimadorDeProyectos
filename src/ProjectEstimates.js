const estimatePrompt = `Parametros de implementacion->
-Lead: Best: Web-to-lead simple, sin asignación automática compleja.  Mid: Incluye múltiples fuentes de entrada (bot, formulario), reglas de validación y owner assignment.  Worst: Leads por región/producto, reglas de conversión específicas, lógica condicional avanzada.
-Contact: Best: Hereda campos de Lead, layout simple.  Mid: Campos personalizados, relaciones con cuentas.  Worst: Lógica condicional, múltiples layouts o record types por perfil.
-Account: Best: Layout estándar, sin jerarquías.  Mid: Diferenciación de cuentas (cliente/proveedor), campos extra.  Worst: Jerarquías, flujos de validación y automatización por tipo.
-Opportunity: Best: Etapas básicas, pipeline único.  Mid: Forecasting, múltiples record types.  Worst: Forecast personalizado, dependencias con cotizaciones, automatizaciones complejas.
-Quote: Best: Relación directa con oportunidad, sin moneda extranjera.  Mid: Multimoneda, PDF templates.  Worst: Templates complejos, flujos condicionales, validaciones de sincronización.
-Product: Best: Productos planos, sin bundles.  Mid: Campos personalizados, familias.  Worst: Integración con ERP, validaciones, múltiples tipos.
-Price Book: Best-Mid-Worst: Carga de lista fija, sin lógica condicional. Mismo esfuerzo.
-Case: Best: Casos internos manuales, sin colas.  Mid: Email-to-case, colas y reglas de asignación.  Worst: Canal WhatsApp, automatizaciones, SLAs y flujos por tipo.
-Task/Event: Best-Mid-Worst: Actividades estándar, sin personalización. Misma complejidad.
-Campaign: Best: Solo para agrupamiento de leads.  Mid: Relación con oportunidades.  Worst: Integración con plataformas externas, métricas y reportes por campaña.
-User/Role/Profile: Best: Pocos perfiles y jerarquía simple.  Mid: 3 a 5 perfiles y roles, control de permisos detallado.  Worst: Roles cruzados, límites de visibilidad complejos por región/vertical.
-Reports & Dashboards: Best: 3 a 5 reportes simples, sin fórmulas.  Mid: Dashboards con filtros, algunos KPIs.  Worst: Dashboards ejecutivos, fórmulas complejas, múltiples públicos.
-Custom Object: Best: 1 objeto, sin relaciones ni flujos.  Mid: 1 objeto con relaciones y automatización simple.  Worst: Múltiples objetos relacionados, validaciones y flows complejos.
-Migración CSV (por objeto): Best: CSV limpio, pocos registros.  Mid: Normalización previa, validaciones.  Worst: Archivos desordenados, campos combinados, deduplicación.
-Automatizaciones: Best: Un par de flows simples y notificaciones.  Mid: Automatizaciones dependientes entre objetos.  Worst: Flujos con lógica avanzada, múltiples paths y excepciones.
-Integración externa: Best: API bien documentada, uso de Webhook/REST sencillo.  Mid: Múltiples endpoints, lógica intermedia.  Worst: ERP legado, lógica compleja, transformación de datos, preprocesos.
-Documentación: Igual esfuerzo. Manuales, checklist e instructivos internos.
-Capacitación: Best: Solo usuarios finales, guía general.  Mid: +Admins, uso de entorno sandbox.  Worst: Capacitación a áreas distintas, entrenamientos diferenciados, talleres.
-Testing y ajustes finales: Best: Testing funcional interno.  Mid: Revisión cruzada con cliente.  Worst: Involucra múltiples usuarios/clientes, regresión de flujos.
-Kickoff / relevamiento / validación: Best: Cliente con procesos definidos y claros.  Mid: Documentación parcial, procesos semiformales.  Worst: Procesos desordenados, necesidad de rediseñar flujos.
`
export default estimatePrompt