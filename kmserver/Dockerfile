#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["kmserver.csproj", "."]
RUN dotnet restore "./kmserver.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "kmserver.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "kmserver.csproj" -c Release -o /app/publish
RUN dotnet dev-certs https -ep /app/publish/server.cert.pfx -p dbQWL@6ZaM

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=https://+:443;http://+:80
ENV Kestrel__Certificates__Default__Path=/app/server.cert.pfx
ENV Kestrel__Certificates__Default__Password=dbQWL@6ZaM

# Expose data volumes
VOLUME ["/app/bin/Debug/net6.0/logs/"]
VOLUME ["/app/logs/"]

ENTRYPOINT ["dotnet", "kmserver.dll"]