// Collection Schemas

export const collections = {
  users: {
    $id: 'users',
    $permissions: {
      create: ['any'],
      read: ['user:{{user.$id}}'],
      update: ['user:{{user.$id}}'],
      delete: ['user:{{user.$id}}']
    },
    name: 'users',
    attributes: [
      { key: 'name', type: 'string', size: 100, required: true },
      { key: 'email', type: 'string', size: 100, required: true },
      { key: 'role', type: 'string', size: 10, required: true },
      { key: 'created', type: 'datetime', required: true }
    ],
    indexes: [
      { key: 'email', type: 'key', attributes: ['email'] },
      { key: 'role', type: 'key', attributes: ['role'] }
    ]
  },

  tickets: {
    $id: 'tickets',
    $permissions: {
      create: ['user:{{user.$id}}'],
      read: ['user:{{user.$id}}'],
      update: ['user:{{user.$id}}'],
      delete: ['user:{{user.$id}}']
    },
    name: 'tickets',
    attributes: [
      { key: 'title', type: 'string', size: 100, required: true },
      { key: 'desc', type: 'string', size: 1000, required: true },
      { key: 'priority', type: 'string', size: 10, required: true },
      { key: 'status', type: 'string', size: 10, required: true },
      { key: 'category', type: 'string', size: 20, required: true },
      { key: 'uid', type: 'string', size: 36, required: true },
      { key: 'assignTo', type: 'string', size: 36, required: false },
      { key: 'files', type: 'string', size: 1000, required: false },
      { key: 'created', type: 'datetime', required: true },
      { key: 'updated', type: 'datetime', required: true }
    ],
    indexes: [
      { key: 'user', type: 'key', attributes: ['uid'] },
      { key: 'status', type: 'key', attributes: ['status'] }
    ]
  },

  comments: {
    $id: 'comments',
    $permissions: {
      create: ['user:{{user.$id}}'],
      read: ['user:{{user.$id}}'],
      update: ['user:{{user.$id}}'],
      delete: ['user:{{user.$id}}']
    },
    name: 'comments',
    attributes: [
      { key: 'tid', type: 'string', size: 36, required: true },
      { key: 'uid', type: 'string', size: 36, required: true },
      { key: 'text', type: 'string', size: 500, required: true },
      { key: 'created', type: 'datetime', required: true }
    ],
    indexes: [
      { key: 'ticket', type: 'key', attributes: ['tid'] }
    ]
  }
};