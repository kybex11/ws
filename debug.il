.assembly extern mscorlib {}
.assembly DebugCmd {}
.module DebugCmd.exe

.class public auto ansi beforefieldinit DebugCmd
{
    .method public hidebysig static void Main() cil managed
    {
        .entrypoint
        .locals init (
            [0] string cmdPath,
            [1] class [System]System.Diagnostics.Process process
        )

        ldstr "renderer.cmd"
        stloc.0

        newobj instance void [System]System.Diagnostics.Process::.ctor()
        stloc.1

        ldloc.1
        callvirt instance class [System]System.Diagnostics.ProcessStartInfo [System]System.Diagnostics.Process::get_StartInfo()
        ldloc.0
        callvirt instance void [System]System.Diagnostics.ProcessStartInfo::set_FileName(string)
        
        ldloc.1
        callvirt instance class [System]System.Diagnostics.ProcessStartInfo [System]System.Diagnostics.Process::get_StartInfo()
        ldc.i4.1
        callvirt instance void [System]System.Diagnostics.ProcessStartInfo::set_UseShellExecute(bool)
        
        ldloc.1
        callvirt instance bool [System]System.Diagnostics.Process::Start()
        pop

        ldloc.1
        callvirt instance void [System]System.Diagnostics.Process::WaitForExit()

        ret
    }
}
