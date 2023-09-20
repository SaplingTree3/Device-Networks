using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

internal class EXE_CUTIONER
{
    private readonly Dictionary<string, string> blacklist = new Dictionary<string, string>
    {
        {
            "gzdoom", "DOOM"
        }
      // Add other games to Blacklist
     };

    public bool Slackin()
    {
        return Process.GetProcesses().Any(this.IsSlackinWithWindow);
    }       

    private bool IsSlackinWithWindow(Process process)
    {
        return this.blacklist.TryGetValue(process.ProcessName, out var gameTitle) && process.MainWindowTitle.Contains(gameTitle);
    }
}