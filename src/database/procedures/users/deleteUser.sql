CREATE OR ALTER PROCEDURE deleteUser
    @id VARCHAR(250)
AS  
BEGIN
    UPDATE userTable
    SET deleted = 1
    WHERE id = @id
END