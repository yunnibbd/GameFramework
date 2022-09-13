//#include <cstdlib>
//#include <iostream>
//#include <thread>
//#include "asio_coro_util.hpp"
//
//using asio::ip::tcp;
//
//async_simple::coro::Lazy<void> session(tcp::socket sock) {
//	int msg_index = 0;
//	for (;;) {
//		const size_t max_length = 1024;
//		char data[max_length];
//		auto [error, length] =
//			co_await async_read_some(sock, asio::buffer(data, max_length));
//		msg_index++;
//		if (error == asio::error::eof) {
//			std::cout << "Remote client closed at message index: "
//				<< msg_index - 1 << ".\n";
//			break;
//		}
//		else if (error) {
//			std::cout << error.message() << '\n';
//			throw asio::system_error(error);
//		}
//
//		co_await async_write(sock, asio::buffer(data, length));
//	}
//
//	std::error_code ec;
//	sock.shutdown(asio::ip::tcp::socket::shutdown_both, ec);
//	sock.close(ec);
//
//	std::cout << "Finished echo message, total: " << msg_index - 1 << ".\n";
//}
//
//async_simple::coro::Lazy<void> start_server(asio::io_context& io_context,
//	unsigned short port,
//	async_simple::Executor* E) {
//	tcp::acceptor a(io_context, tcp::endpoint(tcp::v4(), port));
//	std::cout << "Listen port " << port << " successfully.\n";
//	for (;;) {
//		tcp::socket socket(io_context);
//		auto error = co_await async_accept(a, socket);
//		if (error) {
//			std::cout << "Accept failed, error: " << error.message() << '\n';
//			continue;
//		}
//		std::cout << "New client coming.\n";
//		session(std::move(socket)).via(E).detach();
//	}
//}
//
//int main(int argc, char* argv[]) {
//	try {
//		asio::io_context io_context;
//		std::thread thd([&io_context] {
//			asio::io_context::work work(io_context);
//			io_context.run();
//			});
//		AsioExecutor executor(io_context);
//		async_simple::coro::syncAwait(
//			start_server(io_context, 9980, &executor));
//		thd.join();
//	}
//	catch (std::exception& e) {
//		std::cerr << "Exception: " << e.what() << "\n";
//	}
//
//	return 0;
//}

#define ASIO_STANDALONE
#define _WEBSOCKETPP_CPP11_TYPE_TRAITS_
#include <websocketpp/config/asio_no_tls.hpp>
#include <websocketpp/server.hpp>
#include "Untitle.pb.h"

#include <functional>
#include <string>
using namespace std;

#pragma comment(lib, "libprotobufd.lib")

typedef websocketpp::server<websocketpp::config::asio> server;

class utility_server {
public:
	utility_server() {
		// Set logging settings
		m_endpoint.set_error_channels(websocketpp::log::elevel::all);
		m_endpoint.set_access_channels(websocketpp::log::alevel::all ^ websocketpp::log::alevel::frame_payload);

		// Initialize Asio
		m_endpoint.init_asio();

		// Set the default message handler to the echo handler
		m_endpoint.set_message_handler(std::bind(
			&utility_server::echo_handler, this,
			std::placeholders::_1, std::placeholders::_2
		));
	}

	void echo_handler(websocketpp::connection_hdl hdl, server::message_ptr msg) {
		// write a new message
		Alice::Head head;
		head.ParseFromString(msg->get_payload());
		cout << "收到客户端消息" << head.begin() << " == " << head.end() << endl;

		head.set_begin(head.begin() + 1);
		head.set_end(head.end() + 1);
		m_endpoint.send(hdl, head.SerializeAsString(), msg->get_opcode());
	}

	void run() {
		// Listen on port 9002
		m_endpoint.listen(9002);

		// Queues a connection accept operation
		m_endpoint.start_accept();

		// Start the Asio io_service run loop
		m_endpoint.run();
	}
private:
	server m_endpoint;
};

int main() {
	utility_server s;
	s.run();
	return 0;
}
