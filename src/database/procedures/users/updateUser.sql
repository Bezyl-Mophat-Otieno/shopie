CREATE OR ALTER PROCEDURE updateUser
    @id VARCHAR(250),
    @username varchar(250) = NULL,
    @email varchar(500) = NULL
AS BEGIN
    UPDATE userTable
    SET username = COALESCE(@username, username),
        email = COALESCE(@email, email)
    WHERE id = @id
END
