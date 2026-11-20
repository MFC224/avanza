import { SITE_CONFIG } from "@/lib/site-config";

/**
 * Datos del proveedor y textos del formato de Hoja de Reclamación
 * (Ley N° 29571; D.S. N° 011-2011-PCM, modificado por D.S. N° 101-2022-PCM).
 * Los datos de RUC y domicilio se muestran cuando existan en site-config.
 */
export function ProviderBlock() {
  const { legalName, legal } = SITE_CONFIG;
  const ruc = legal.ruc;
  const address = legal.fiscalAddress;
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-6">
      <div>
        <dt className="type-small text-[var(--muted-on-paper)]">Proveedor</dt>
        <dd className="type-body mt-1">{legalName}</dd>
      </div>
      {ruc && (
        <div>
          <dt className="type-small text-[var(--muted-on-paper)]">RUC</dt>
          <dd className="type-body mt-1">{ruc}</dd>
        </div>
      )}
      {address && (
        <div>
          <dt className="type-small text-[var(--muted-on-paper)]">Domicilio</dt>
          <dd className="type-body mt-1">{address}</dd>
        </div>
      )}
      <div>
        <dt className="type-small text-[var(--muted-on-paper)]">Correo para reclamos</dt>
        <dd className="type-body mt-1">
          <a href={`mailto:${SITE_CONFIG.contact.email}`} className="underline underline-offset-4">
            {SITE_CONFIG.contact.email}
          </a>
        </dd>
      </div>
    </dl>
  );
}

export function Definitions() {
  return (
    <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
      <div>
        <dt className="type-body font-medium">Reclamo</dt>
        <dd className="type-body text-[var(--muted-on-paper)] mt-1">
          Disconformidad relacionada a los productos o servicios.
        </dd>
      </div>
      <div>
        <dt className="type-body font-medium">Queja</dt>
        <dd className="type-body text-[var(--muted-on-paper)] mt-1">
          Disconformidad no relacionada a los productos o servicios; o malestar o descontento respecto a la atención al público.
        </dd>
      </div>
    </dl>
  );
}

export function LegalNotes() {
  return (
    <ul className="flex flex-col gap-3 type-small text-[var(--muted-on-paper)] max-w-[70ch]">
      <li>
        La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo
        para interponer una denuncia ante el INDECOPI.
      </li>
      <li>
        El proveedor deberá dar respuesta al reclamo o queja en un plazo no mayor a quince (15) días hábiles
        improrrogables, por escrito y al medio que indiques (correo electrónico o carta).
      </li>
      <li>La atención de tu reclamo no está condicionada al pago previo del servicio.</li>
      <li>
        Tus datos se usan solo para atender esta hoja, conforme a la Ley N° 29733 de Protección de Datos Personales.
      </li>
    </ul>
  );
}
