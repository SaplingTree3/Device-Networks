using System;
using System.Net.Sockets;
using System.Net;
using System.Text;
using System.Diagnostics;
using System.Text.RegularExpressions;
using System.Windows.Automation;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;

namespace Client
{
    class Program
    {
        // Setup some basic starting variables: PORT_NO, SERVER_IP, client2
        const int PORT_NO = 4020;
        const string SERVER_IP = "192.168.1.121";
        WebClient client2 = null;

        // Main Function
        static void Main(string[] args)
        {
            // Defines the use of the class DetectOpenBrowser from EXE_CUTIONER Class, which detects if someone is SLACKIN' OFF.
            string DetectOpenBrowser()
                {
                    var detector = new EXE_CUTIONER();
                    if (detector.Slackin())
                    {
                    Thread.Sleep(3000);
                    return "1";
                    }
                    else
                    {
                    Thread.Sleep(3000);
                    return "0";
                    }
                }

                // Create a TCPClient object at the IP and port no.
            TcpClient client = new TcpClient(SERVER_IP, PORT_NO);
            NetworkStream nwStream = client.GetStream();
            while (true) 
                {
                string textToSend = DetectOpenBrowser();
                byte[] bytesToSend = ASCIIEncoding.ASCII.GetBytes(textToSend);

                // Send the Text
                Console.WriteLine("Sending : " + textToSend);
                nwStream.Write(bytesToSend, 0, bytesToSend.Length);

                // Read back the Text
                byte[] bytesToRead = new byte[client.ReceiveBufferSize];
                int bytesRead = nwStream.Read(bytesToRead, 0, client.ReceiveBufferSize);
                Console.WriteLine("Received : " + Encoding.ASCII.GetString(bytesToRead, 0, bytesRead));

                // Set up webclient for data download via API call.
                WebClient client2 = new WebClient();
                client2.Headers["User-Agent"] =
                "Mozilla/4.0 (Compatible; Windows NT 5.1; MSIE 6.0)";

                byte[] arr = client2.DownloadData("http://192.168.1.121:4025/api/button/status");

                // Write values.
                string resp = Encoding.UTF8.GetString(arr);

                // Kill the task.
                if (textToSend == "1" && resp == "1")
                    Process.Start("taskkill", "/F /IM gzdoom.exe");

            }
        }
    }
}