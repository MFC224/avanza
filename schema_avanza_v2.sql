-- ==============================================================================
-- SCHEMA AVANZA V2 - ESTRUCTURA DE BASE DE DATOS PARA AGENCIA DE IA
-- ==============================================================================

-- 1. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ROLES Y USUARIOS
CREATE TABLE public.roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.roles IS 'Define los niveles de acceso (ej. admin, client)';

CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_id UUID NOT NULL REFERENCES public.roles(id) ON DELETE RESTRICT,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.users IS 'Usuarios del sistema (equipo interno y clientes)';
CREATE INDEX idx_users_role ON public.users(role_id);
CREATE INDEX idx_users_email ON public.users(email);

-- 3. CRM Y CLIENTES (LEADS Y COMPAÑÍAS)
CREATE TABLE public.companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    website VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.companies IS 'Empresas registradas, sean leads o clientes consolidados';

CREATE TABLE public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    contact_name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    interest_level VARCHAR(50) CHECK (interest_level IN ('Bajo', 'Medio', 'Alto', 'Urgente')),
    funnel_status VARCHAR(50) NOT NULL DEFAULT 'Contacto Inicial' 
        CHECK (funnel_status IN ('Contacto Inicial', 'Reunión Agendada', 'Propuesta Enviada', 'Negociación', 'Ganado', 'Perdido')),
    assigned_to UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.leads IS 'Registro de prospectos y su avance en el embudo de ventas';
CREATE INDEX idx_leads_company ON public.leads(company_id);
CREATE INDEX idx_leads_status ON public.leads(funnel_status);

-- 4. PROYECTOS
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE RESTRICT,
    manager_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    tech_stack TEXT,
    total_budget NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    status VARCHAR(50) NOT NULL DEFAULT 'Planificación' 
        CHECK (status IN ('Planificación', 'En Desarrollo', 'En Pausa', 'Completado', 'Cancelado')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.projects IS 'Entidad central que representa los proyectos vendidos a los clientes';
CREATE INDEX idx_projects_company ON public.projects(company_id);
CREATE INDEX idx_projects_status ON public.projects(status);

-- 5. METODOLOGÍA SCRUM (SPRINTS)
CREATE TABLE public.sprints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    version_name VARCHAR(50) NOT NULL,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    status VARCHAR(50) NOT NULL DEFAULT 'Pendiente' 
        CHECK (status IN ('Pendiente', 'Activo', 'Completado', 'Cancelado')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.sprints IS 'Sprints o iteraciones asociados a cada proyecto';
CREATE INDEX idx_sprints_project ON public.sprints(project_id);
CREATE INDEX idx_sprints_status ON public.sprints(status);

-- 6. CONTROL DE CALIDAD (QA TESTS)
CREATE TABLE public.qa_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sprint_id UUID NOT NULL REFERENCES public.sprints(id) ON DELETE CASCADE,
    tester_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    test_type VARCHAR(50) NOT NULL 
        CHECK (test_type IN ('Unitaria', 'Integración', 'E2E', 'Satisfacción del Cliente', 'Seguridad')),
    is_passed BOOLEAN NOT NULL DEFAULT FALSE,
    notes TEXT,
    tested_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.qa_tests IS 'Registros de pruebas de calidad vinculadas a las entregas (Sprints)';
CREATE INDEX idx_qa_tests_sprint ON public.qa_tests(sprint_id);
CREATE INDEX idx_qa_tests_passed ON public.qa_tests(is_passed);

-- 7. HITOS FINANCIEROS (PAGOS)
CREATE TABLE public.financial_milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    milestone_name VARCHAR(255) NOT NULL,
    amount NUMERIC(15, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Pendiente' 
        CHECK (status IN ('Pendiente', 'Procesando', 'Pagado', 'Vencido')),
    due_date TIMESTAMPTZ,
    paid_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.financial_milestones IS 'Cronograma de pagos, adelantos y facturación por proyecto';
CREATE INDEX idx_financial_project ON public.financial_milestones(project_id);
CREATE INDEX idx_financial_status ON public.financial_milestones(status);

-- 8. ALERTAS Y NOTIFICACIONES
CREATE TABLE public.alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    target_user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.alerts IS 'Avisos y recordatorios internos para el equipo';
CREATE INDEX idx_alerts_user ON public.alerts(target_user_id);
CREATE INDEX idx_alerts_read ON public.alerts(is_read);

-- ==============================================================================
-- FUNCIONES AUTOMÁTICAS (TRIGGERS) PARA UPDATED_AT
-- ==============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
