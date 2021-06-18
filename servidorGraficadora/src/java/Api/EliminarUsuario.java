package Api;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;


/**
 *
 * @author Luis
 */

public class EliminarUsuario extends HttpServlet {

    int row;
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String id = request.getParameter("idUsuario");
        System.out.println("El id es:"+id);
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection db = DriverManager.getConnection("jdbc:mysql://localhost/graficadoraDeLineas","miguel", "1234");
            PreparedStatement statement = db.prepareStatement("DELETE FROM usuarios WHERE idUsuario = ?");
            statement.setString(1, id);
            row = statement.executeUpdate();
        } catch (Exception ex) {
            System.out.println("No se pudo eliminar el registro");
            ex.printStackTrace();
        }
    }
}