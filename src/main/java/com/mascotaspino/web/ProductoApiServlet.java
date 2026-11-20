package com.mascotaspino.web;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.mascotaspino.modelo.Producto;
import com.mascotaspino.servicio.ProductoService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.Map;

/** API REST que conecta los componentes React con el servicio JDBC existente. */
@WebServlet(urlPatterns = {"/api/productos", "/api/productos/*"})
public class ProductoApiServlet extends HttpServlet {
    private final ProductoService servicio = new ProductoService();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        prepararRespuesta(response);
        try {
            response.getWriter().write(gson.toJson(servicio.listarProductos()));
        } catch (SQLException exception) {
            enviarError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "No fue posible consultar los productos. Verifique la conexión con MySQL.");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        prepararRespuesta(response);
        try {
            Producto producto = leerProducto(request);
            servicio.registrarProducto(producto);
            response.setStatus(HttpServletResponse.SC_CREATED);
            response.getWriter().write(gson.toJson(Map.of("mensaje", "Producto registrado correctamente.")));
        } catch (IllegalArgumentException | JsonSyntaxException exception) {
            enviarError(response, HttpServletResponse.SC_BAD_REQUEST, exception.getMessage());
        } catch (SQLException exception) {
            enviarError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "No se pudo guardar el producto. Verifique la base de datos.");
        }
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        prepararRespuesta(response);
        try {
            int id = obtenerId(request);
            Producto producto = leerProducto(request);
            producto.setIdProducto(id);
            if (!servicio.modificarProducto(producto)) {
                enviarError(response, HttpServletResponse.SC_NOT_FOUND, "El producto no existe.");
                return;
            }
            response.getWriter().write(gson.toJson(Map.of("mensaje", "Producto actualizado correctamente.")));
        } catch (IllegalArgumentException | JsonSyntaxException exception) {
            enviarError(response, HttpServletResponse.SC_BAD_REQUEST, exception.getMessage());
        } catch (SQLException exception) {
            enviarError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "No se pudo actualizar el producto. Verifique la base de datos.");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        prepararRespuesta(response);
        try {
            if (!servicio.retirarProducto(obtenerId(request))) {
                enviarError(response, HttpServletResponse.SC_NOT_FOUND, "El producto no existe.");
                return;
            }
            response.setStatus(HttpServletResponse.SC_NO_CONTENT);
        } catch (IllegalArgumentException exception) {
            enviarError(response, HttpServletResponse.SC_BAD_REQUEST, exception.getMessage());
        } catch (SQLException exception) {
            enviarError(response, HttpServletResponse.SC_CONFLICT,
                    "No se pudo eliminar. Compruebe si el producto está relacionado con otros registros.");
        }
    }

    // Convierte el cuerpo JSON recibido desde React en el modelo usado por JDBC.
    private Producto leerProducto(HttpServletRequest request) throws IOException {
        Producto producto = gson.fromJson(request.getReader(), Producto.class);
        if (producto == null || producto.getPrecio() == null) {
            throw new IllegalArgumentException("Los datos del producto están incompletos.");
        }
        if (producto.getPrecio().compareTo(BigDecimal.ZERO) < 0 || producto.getStock() < 0) {
            throw new IllegalArgumentException("El precio y las existencias no pueden ser negativos.");
        }
        return producto;
    }

    private int obtenerId(HttpServletRequest request) {
        String ruta = request.getPathInfo();
        if (ruta == null || !ruta.matches("/\\d+")) {
            throw new IllegalArgumentException("Debe indicar un ID de producto válido.");
        }
        return Integer.parseInt(ruta.substring(1));
    }

    private void prepararRespuesta(HttpServletResponse response) {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
    }

    private void enviarError(HttpServletResponse response, int estado, String mensaje) throws IOException {
        response.setStatus(estado);
        response.getWriter().write(gson.toJson(Map.of("mensaje", mensaje == null ? "Error en la solicitud." : mensaje)));
    }
}
