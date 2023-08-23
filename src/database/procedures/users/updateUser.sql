CREATE OR ALTER PROCEDURE updateUser
    @id VARCHAR(250),
    @username varchar(250) = NULL,
    @email varchar(500) = NULL,
    @role varchar(250) = NULL,
    @deleted bit = NULL
AS BEGIN
    UPDATE userTable
    SET username = COALESCE(@username, username),
        email = COALESCE(@email, email),
        role = COALESCE(@role, role),
        deleted = COALESCE(@deleted, deleted)
    WHERE id = @id
END
