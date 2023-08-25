CREATE OR ALTER PROCEDURE updateUser
    @id VARCHAR(250),
    @username varchar(250) = NULL,
    @email varchar(500) = NULL,
    @role varchar(250) = NULL,
    @deleted bit = NULL,
    @password varchar(250) = NULL
AS BEGIN
    UPDATE userTable
    SET username = COALESCE(@username, username),
        email = COALESCE(@email, email),
        role = COALESCE(@role, role),
        deleted = COALESCE(@deleted, deleted),
        password = COALESCE(@password, password)
    WHERE id = @id
END
