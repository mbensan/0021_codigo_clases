## APP Entel

POST /tickets
  Data:
  - client_id: INT
  - text: STRING


  Response:
  `
  {
    ticket_id: INT,
    created_at: DATETIME
  }
  `

GET /tickets/:id

  Response:
  `
  {
    id,
    status,
    created_at,
    updated_at,
    text,
    client_id,
    agent_id,
    messages: [
      {
        id,
        text,
        creator_id
      }, ...
    ]
  }
  `

GET /tickets?page=4&limit=3&criteria=closed|updated

GET /tickets
  Query {
    page: INT,
    limit: INT,
    criteria: closed | updated
  }

POST /tickets/:id/messages
  Data:
  - emiter_id: INT,
  - message: TEXT,
  - created_at: DATETIME


PATCH /tickets/:id
  Data:
  - status: close

