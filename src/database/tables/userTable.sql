BEGIN TRY
    CREATE TABLE userTable (
        id VARCHAR(250) NOT NULL PRIMARY KEY,
        username VARCHAR(250) NOT NULL,
        email VARCHAR(500) NOT NULL,
        password VARCHAR(300) NULL,
        role VARCHAR(15) CHECK (role IN ('admin', 'user')) DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    );
END TRY
BEGIN CATCH
    THROW 50001, 'An error occurred while creating the productTable', 1;
END CATCH;
