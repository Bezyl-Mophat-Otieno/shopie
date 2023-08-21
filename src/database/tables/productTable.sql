BEGIN TRY
    CREATE TABLE productTable (
        id VARCHAR(250) NOT NULL PRIMARY KEY,
        name VARCHAR(250) NOT NULL,
        description VARCHAR(500) NOT NULL,
        image VARCHAR(300) NULL,
        price DECIMAL(10,2) NOT NULL,

    );
END TRY
BEGIN CATCH
    THROW 50001, 'An error occurred while creating the productTable', 1;
END CATCH;

GO 

-- ALTER TABLE productTable
-- ADD quantity INT DEFAULT 1;