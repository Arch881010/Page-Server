<!-- @format -->

# SST-Collector

## Description

The SST-Collector is a data collection tool for an ISEF project at ASMSA. It is built using Node.js, Express, and MySQL.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Arch881010/SST-Collector.git
   cd SST-Collector
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables. You can use the `example.env` file as a reference:
   ```env
   viewer_user=your_viewer_user
   viewer_password=your_viewer_password
   writer_user=your_writer_user
   writer_password=your_writer_password
   database=your_database_name
   port=your_port
   table=your_table_name
   ```

## Usage

1. Start the server:

   ```sh
   npm start
   ```

2. Access the application in your browser at `http://localhost:3000`.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, please open an issue on [GitHub](https://github.com/Arch881010/SST-Collector/issues).
