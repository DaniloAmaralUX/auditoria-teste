/**
 * Usuários do painel (RF-021). Perfis: committee_member e channel_admin.
 * Luana e Valença são usuárias iniciais CONFIGURÁVEIS — nenhuma lógica é hard-coded por nome
 * (o papel governa as permissões, não o nome). Em produção viria do backend/diretório.
 */

export type Role = "committee_member" | "channel_admin"

export type AdminUser = {
  id: string
  name: string
  email: string
  role: Role
  initials: string
}

export const mockUsers: AdminUser[] = [
  {
    id: "u-luana",
    name: "Luana Leão",
    email: "luana.leao@pitang.com",
    role: "committee_member",
    initials: "LL",
  },
  {
    id: "u-valenca",
    name: "Valença",
    email: "valenca@pitang.com",
    role: "committee_member",
    initials: "VA",
  },
  {
    id: "u-admin",
    name: "Administração do Canal",
    email: "canal.etica@pitang.com",
    role: "channel_admin",
    initials: "AC",
  },
]

export const roleLabels: Record<Role, string> = {
  committee_member: "Comitê de Ética",
  channel_admin: "Administrador do canal",
}

/** Permissões por papel (RBAC de interface; o servidor revalida — RN-002). */
export const rolePermissions = {
  committee_member: {
    viewQueue: true,
    viewManifestation: true,
    viewRestrictedIdentity: true,
    writeResponse: true,
    writeInternalNote: true,
    changeStatus: true,
    manageUsers: false,
    manageDocuments: false,
    exportData: false,
  },
  channel_admin: {
    viewQueue: true,
    viewManifestation: true,
    viewRestrictedIdentity: false,
    writeResponse: false,
    writeInternalNote: false,
    changeStatus: false,
    manageUsers: true,
    manageDocuments: true,
    exportData: true,
  },
} as const

export type Permission = keyof (typeof rolePermissions)["committee_member"]

export function can(role: Role, permission: Permission): boolean {
  return rolePermissions[role][permission]
}
