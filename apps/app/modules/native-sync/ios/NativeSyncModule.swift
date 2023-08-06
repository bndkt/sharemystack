import ExpoModulesCore
import PostgREST

public class NativeSyncModule: Module {
    // Each module class must implement the definition function. The definition consists of components
    // that describes the module's functionality and behavior.
    // See https://docs.expo.dev/modules/module-api for more details about available components.
    public func definition() -> ModuleDefinition {
        // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
        // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
        // The module will be accessible from `requireNativeModule('NativeSync')` in JavaScript.
        Name("NativeSync")
        
        // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
        Constants([
            "PI": Double.pi
        ])
        
        // Defines event names that the module can send to JavaScript.
        Events("onChange")
        
        // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
        Function("hello") {
            return "Hello world! 👋"
        }
        
        // Defines a JavaScript function that always returns a Promise and whose native code
        // is by default dispatched on the different thread than the JavaScript runtime runs on.
        AsyncFunction("setValueAsync") { (value: String) in
            // Send an event to JavaScript.
            self.sendEvent("onChange", [
                "value": value
            ])
        }
        
        // Enables the module to be used as a native view. Definition components that are accepted as part of the
        // view definition: Prop, Events.
        View(NativeSyncView.self) {
            // Defines a setter for the `name` prop.
            Prop("name") { (view: NativeSyncView, prop: String) in
                print(prop)
            }
        }
        
        // https://watermelondb.dev/docs/Sync/Frontend#advanced-adopting-turbo-login
        AsyncFunction("pullSyncChanges") { (url: String, apiKey: String, syncId: Int, lastPulledAt: Int) -> Data? in
            let logger = Logger()
            logger.info("pullSyncChanges NATIVE 3")

            struct Params: Encodable {
                let last_pulled_at: Int
            }
            let client = PostgrestClient(
                url: URL(string: "http://localhost:54321/rest/v1")!,
                headers: [
                    "apikey":
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
                ],
                schema: "public"
            )
            let params = Params(last_pulled_at: lastPulledAt)
            do {
                let result = try await client.rpc(fn: "pull", params: params).execute();
                logger.info(result.underlyingResponse.data)

                // extern void watermelondbProvideSyncJson(int id, NSData *json, NSError **errorPtr);
                var error: NSError?
                watermelondbProvideSyncJson(syncId, result.underlyingResponse.data, &error)
                
                return result.underlyingResponse.data
            } catch {
                logger.info("An error occurred: \(error)")
            }
            logger.info("after exec")
            
            return nil
           
            // return result
            // extern void watermelondbProvideSyncJson(int id, NSData *json, NSError **errorPtr);
            // watermelondbProvideSyncJson(syncId, data, &error)
        }
    }
}
