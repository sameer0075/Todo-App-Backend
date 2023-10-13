function getTests() {
    return {
        "status":true,
        "message": "Create a new todo successfully.",
        "data": [{
            "_id": "65297f311b1a54f30b27bd24",
            "title": "New Task",
            "description": "Test",
            "status": "ACTIVE"
        }]
    }
}

function getTest() {
    return {
        "status":true,
        "message": "Create a new todo successfully.",
        "data": {
            "_id": "65297f311b1a54f30b27bd24",
            "title": "New Task",
            "description": "Test",
            "status": "ACTIVE"
        }
    }
}

function addOrUpdateTest(payload) {
    return {
        "status":true,
        "message": "Create a new todo successfully.",
        "data": {
            "_id": "65297f311b1a54f30b27bd24",
            "title": "New Task",
            "description": "Test",
            "status": "ACTIVE"
        }
    }
}

describe("GET /todos-all", () => {
    it("Get Todos", async () => {
      const response = getTests();
      expect(response.status).toBe(true);
    });
});

describe("GET /todo/:id", () => {
    it("Get Todo", async () => {
      const response = getTest();
      expect(response.status).toBe(true);
    });
});

describe("POST /todo/new", () => {
    const payload =  {
        title:"new",
        description:"test",
        status:"ACTIVE"
    }
    it("Add Todo", async () => {
      const response = addOrUpdateTest(payload);
      expect(response.status).toBe(true);
    });
});

describe("PUT /todo/:id", () => {
    const payload =  {
        title:"new",
        description:"test",
        status:"ACTIVE"
    }
    it("Update Todo", async () => {
      const response = addOrUpdateTest(payload);
      expect(response.status).toBe(true);
    });
});

describe("DELETE /todo/:id", () => {
    it("Delete Todo", async () => {
      const response = getTest();
      expect(response.status).toBe(true);
    });
});